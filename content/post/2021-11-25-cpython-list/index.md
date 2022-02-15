---
title: "Pythonのlistの実装から計算量を調べた"
type: "post"
draft: false
date: "2021-11-25T11:01:36+00:00"
---

とあるコミュニティでPythonのlistの、データ構造としての実態と計算量が話題に上がったのでメモしておきます。文中に登場するコードや参考リンクはそのコミュニティで教えていただいたものを含みます。(僕だけが調べた結果ではありません。)

## Pythonのlistの計算量を調べるまでの経緯

競技プログラミングの問題 [ABC 073 C - Write and Erase](https://atcoder.jp/contests/abc073/tasks/abc073_c) について、以下のコードはTLEします。(2206ms)

```py:TLE.py
n = int(input())

joisino = []

for _ in range(n):
  a = int(input())
  if (a in joisino):
    joisino.remove(a)
  else:
    joisino.append(a)

print(len(joisino))
```

しかし、以下のコードはACします。(171ms)

```py:AC.py
n = int(input())

joisino = set()

for _ in range(n):
    a = int(input())
    if (a not in joisino):
        joisino.add(a)
    else:
        joisino.remove(a)
        
print(len(list(joisino)))
```

`joisino` という変数がlistかsetかという違いだけで、それ以外の部分は本質的に違いがありません。ここで疑問が生まれます。
**「Pythonのlistはどういうデータ構造になっているのか？」**
この問いに対しCPythonに限定して実装を読んでいくことにします。

## listの実装

listの実体は[cpython/include/cpython/listobject.h](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Include/cpython/listobject.h#L5-L22)にあります。この `PyListObject` という構造体がPythonのlistの実体になっています。

```c:listobject.h
typedef struct {
    PyObject_VAR_HEAD
    PyObject **ob_item;
    Py_ssize_t allocated;
} PyListObject;
```

`PyObject_VAR_HEAD`, `ob_item`, `allocated` の3要素からなっています。

`PyObject_VAR_HEAD`: [object.h](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Include/object.h#L97) で定義されています。`PyVarObject`が気になるので調べると、[ここで](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Include/object.h#L115-L118) 定義されています。結局実体は`PyObject`に行き着きそうですね。コメントも読んでみましょう。

```c:object.h
/* PyObject_VAR_HEAD defines the initial segment of all variable-size
 * container objects.  These end with a declaration of an array with 1
 * element, but enough space is malloc'ed so that the array actually
 * has room for ob_size elements.  Note that ob_size is an element count,
 * not necessarily a byte count.
 */
#define PyObject_VAR_HEAD      PyVarObject ob_base;
```

可変サイズのオブジェクトの定義のための部分のようですね。これはリストの実体ではなさそうです。

`ob_item`: `/* Vector of pointers to list elements.  list[0] is ob_item[0], etc. */` というコメントがあるように、これはリストの要素へのポインタを格納するvectorです。
例えば、以下のようなリストを考えます。

```py
x = [1,2,3]
```

このとき、1,2,3の要素はそれぞれPyObjectにくるまれており、その要素へのポインタが並んだものが`ob_item`となっているので、PyObjectに対するポインタのポインタとなっていることが理解できます。

`allocated`: 通常の配列の実装は要素を配列にpushするたびにメモリのallocateが発生します。しかし、capacityのような概念を導入し、配列にpushしたときに将来的にまたpushされることを見越してあらかじめメモリ領域を多めにとっておきます。この多めにとった領域全体の長さをcapacityとして変数に持ちます。`allocated`はこのcapacityに相当する変数のようです。

以上で、listを構成する3つの要素を見てきました。
結論としては、listは各要素が入っているPyObjectへのポインタの配列です(ただし、ただの配列ではなく、capacityの概念がついている可変長配列)
次に、append/removeの計算量を調べるためにビルトイン関数の実装を見ていきます。

## `append/remove` の実装

`append` の実装は [listobject.c](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Objects/listobject.c#L308-L330)にあります。

```c:listobject.c
static int
app1(PyListObject *self, PyObject *v)
{
    Py_ssize_t n = PyList_GET_SIZE(self);

    assert (v != NULL);
    assert((size_t)n + 1 < PY_SSIZE_T_MAX);
    if (list_resize(self, n+1) < 0)
        return -1;

    Py_INCREF(v);
    PyList_SET_ITEM(self, n, v);
    return 0;
}

int
PyList_Append(PyObject *op, PyObject *newitem)
{
    if (PyList_Check(op) && (newitem != NULL))
        return app1((PyListObject *)op, newitem);
    PyErr_BadInternalCall();
    return -1;
}
```

どうやら以下の参照カウントを一つ増やしてから`SET ITEM`している部分が本体のようです。

```c
    Py_INCREF(v);
    PyList_SET_ITEM(self, n, v);
```

`PyList_SET_ITEM`は[`listobject.h`](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Include/cpython/listobject.h#L33)にあり、

```c:listobject.h
#define PyList_SET_ITEM(op, i, v) ((void)(_PyList_CAST(op)->ob_item[i] = (v)))
```

`ob_item`の要素のひとつの参照先を割り当てる動作をしています。
どうやらappendは $O(1)$ で動作していることが分かりました。

`remove` の実装は [listobject.c](https://github.com/python/cpython/blob/f4c03484da59049eb62a9bf7777b963e2267d187/Objects/listobject.c#L2705-L2727) にあります。
`list_remove` を読むと、比較して等しい場合に`list_ass_slice`を使っているのでそこを追ってみます。

// TODO
// メモリ領域連続性調査
// 公式の言及 https://docs.python.org/3/faq/design.html#how-are-lists-implemented-in-cpython
