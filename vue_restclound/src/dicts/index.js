export default function () {

    this.keyToValue = (key) => {
        const list = this.data
        for (let item of list) {
            if (item.key === key) {
                return item.value
            }
        }
    }

    this.keyToLabel = (key) => {
        const list = this.data
        for (let item of list) {
            if (item.key === key) {
                return item.label
            }
        }
    }

    this.valueToLabel = (value) => {
        const list = this.data
        for (let item of list) {
            if (item.value === value) {
                return item.label
            }
        }
    }

    this.labelToValue = (label) => {
        const list = this.data
        for (let item of list) {
            if (item.label === label) {
                return item.value
            }
        }
    }

    this.valueToKey = (value) => {
        const list = this.data
        for (let item of list) {
            if (item.value === value) {
                return item.key
            }
        }
    }

    this.dictToList = () => {
        return this.data
    }
}

export const DictValueToLabel = (dictName, value) => require(`./${dictName}`).default.valueToLabel(value)

export const DictLabelToValue = (dictName, label) => require(`./${dictName}`).default.labelToValue(label)

export const DictKeyToValue = (dictName, key) => require(`./${dictName}`).default.keyToValue(key)

export const DictKeyToLabel = (dictName, key) => require(`./${dictName}`).default.keyToLabel(key)

export const DictValueToKey = (dictName, value) => require(`./${dictName}`).default.valueToKey(value)

export const DictToList = (dictName) => require(`./${dictName}`).default.dictToList()