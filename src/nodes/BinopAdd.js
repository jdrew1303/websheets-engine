import BaseBinop from './BaseBinop';


export default class BinopAdd extends BaseBinop {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    clone() {
        return new BinopAdd(
            this.left.clone(),
            this.right.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.left);
        cb(this.right);
    }
    runNumericOperation(left, right) {
        return left + right;
    }
    toString() {
        return `(${this.left} + ${this.right})`;
    }
};
