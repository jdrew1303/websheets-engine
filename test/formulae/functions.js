import assert from 'assert';

import compiler from '../../src';

import {Runner} from './_utils.js';


describe('Functions', () => {
    it('should be available from formula.js', () => {
        assert.equal(compiler('AVERAGE(2,3,4)').run(null), 3);
        assert.equal(compiler('SUM(4,5)').run(null), 9);
    });
    it('and()', () => {
        const r = new Runner({A1: 1, A2: 1, A3: 0});
        assert.equal(compiler('AND(A1, A2)').run(r), 1);
        assert.equal(compiler('AND(A1, A2, A3)').run(r), 0);
        assert.equal(compiler('AND(1,2,3)').run(r), 1);
        assert.equal(compiler('AND("foo", 0)').run(r), 0);
        assert.equal(compiler('AND("foo")').run(r), 1);
    });
    it('isblank()', () => {
        const r = new Runner({A1: null, A2: '', A3: 0});
        assert.equal(compiler('ISBLANK(A1)').run(r), 1);
        assert.equal(compiler('ISBLANK(A2)').run(r), 1);
        assert.equal(compiler('ISBLANK(A3)').run(r), 0);
        assert.equal(compiler('ISBLANK("")').run(r), 1);
        assert.equal(compiler('ISBLANK("foo")').run(r), 0);
    });
    it('not()', () => {
        const r = new Runner({A1: null});
        assert.equal(compiler('NOT(1)').run(r), false);
        assert.equal(compiler('NOT(0)').run(r), true);
        assert.equal(compiler('NOT(false)').run(r), true);
        assert.equal(compiler('NOT(true)').run(r), false);
        assert.equal(compiler('NOT(10)').run(r), false);
    });
    it('or()', () => {
        const r = new Runner({A1: 1, A2: 1, A3: 0});
        assert.equal(compiler('OR(A1, A2)').run(r), 1);
        assert.equal(compiler('OR(A1, A2, A3)').run(r), 1);
        assert.equal(compiler('OR(1,2,3)').run(r), 1);
        assert.equal(compiler('OR("foo", 0)').run(r), 1);
        assert.equal(compiler('OR("foo")').run(r), 1);
        assert.equal(compiler('OR(A3)').run(r), 0);
        assert.equal(compiler('OR(0,0,0)').run(r), 0);
    });
    it('pi()', () => {
        assert.equal(compiler('PI()').run(null), Math.PI);
    });

    describe('offset()', () => {
        it('should adjust cell references', () => {
            const r = new Runner({A1: 1, A2: 2, B1: 3, B2: 4});
            assert.equal(compiler('offset(a1, 1, 0)').run(r), 2);
            assert.equal(compiler('offset(b1, 1, 0)').run(r), 4);
        });
        it('should adjust sizes', () => {
            const r = new Runner({A1: 1, A2: 2, B1: 3, B2: 4});
            assert.equal(compiler('sum(offset(a1, 0, 0, 2, 2))').run(r), 10);
        });
    });

});
