# s5cmd GitHub Action

Setup [s5cmd](https://github.com/peak/s5cmd) command on GitHub Actions runners.

## Inputs

### `version`

The version of s5cmd to download, optional. Leave blank for latest.

## Example usage

```yaml
uses: derekn/s5cmd-action@v3 # or @latest
with:
  version: 2.3.0 # optional, default latest
```

---

_Note: This project is not affiliated with Peak, the owners of s5cmd._
