export default function (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
