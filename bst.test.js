const BST = require('./bst');


describe("test the lookup method in trivial trees", () => {

    const t = new BST();

    test("lookup in empty list should return null", () => {
        expect(t.lookup("groot")).toBe(null);
        expect(t.lookup(5)).toBe(null);
    });

    test("lookup in a list with one entry", () => {
        t.insert('groot', 55);
        expect(t.lookup("groot")).toBe(55);
        expect(t.lookup(5)).toBe(null);
    });

});

describe("test add and lookup methods", () => {

    const t = new BST();

    const toAdd = [50, 25, 12,6,37,31,75,66,89,95];
    for (let i = 0; i < toAdd.length; i++) {
        t.insert(toAdd[i], 'test ' + toAdd[i]);
    }
    test("lookup existent and non-existent entries in bst", () => {
        for (let i = 0; i < 100; i++) {
            if (toAdd.indexOf(i) === -1) {
                expect(t.lookup(i)).toBe(null);
            } else {
                expect(t.lookup(i)).toBe('test ' + i);
            }
        }
    });
});

describe("range queries with no results", () => {

    test("range query of empty tree", () => {
        const t = new BST();

        expect(t.range(0, 50)).toEqual([]);
        expect(t.range('myrange', 'z')).toEqual([]);
    });

    test("ranges with empty results", () => {
        const t = new BST();

        t.insert('myki', '$3.50');
        t.insert(0, 'xyz');
        t.insert(-1, 'abc');
        t.insert(10, 'def');
        t.insert(-10, 'defg');

        // must be empty no matter what is in BST
        expect(t.range(0, -1)).toEqual([]);
        expect(t.range(0, -1)).toEqual([]);

        // will be empty in this case
        expect(t.range('m', 'mx')).toEqual([]);

    });
});
describe("range queries with some results", () => {

    test("ranges with a leaf-only result", () => {
        const t = new BST();

        // root node
        t.insert('test', 5);
        expect(t.range('a', 'z')).toEqual([5]);

        // other leaves
        t.insert('test2', 2);
        t.insert('test3', 3);
        t.insert('test7', 7);
        t.insert('test8', 8);
        expect(t.range('test2', 'test3')).toEqual([2, 3]);
    });

    test("ranges with complex results", () => {
        const t = new BST();

        t.insert('test5', 5);
        t.insert('test2', 2);
        t.insert('test3', 3);
        t.insert('test7', 7);
        t.insert('test8', 8);
        expect(t.range('test2', 'test7')).toEqual([2, 3, 5, 7]);
        expect(t.range('test3', 'test5')).toEqual([3, 5]);


    });


});

