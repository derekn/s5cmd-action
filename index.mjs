import * as core from '@actions/core'
import * as tool from '@actions/tool-cache'
import { Octokit } from 'octokit'

async function getDownloadUrl(version) {
	if (version === 'latest') {
		const octokit = new Octokit()
		const release = await octokit.rest.repos.getLatestRelease({ owner: 'peak', repo: 's5cmd' })
		version = release.data.tag_name.replace(/^v/, '')
	}
	const platform = { linux: 'Linux', darwin: 'macOS', win32: 'Windows' }[process.platform]
	const arch = { x32: '32bit', x64: '64bit', arm: 'armv6', arm64: 'arm64' }[process.arch]
	const filename = `s5cmd_${version}_${platform}-${arch}`
	const extension = process.platform === 'win32' ? 'zip' : 'tar.gz'
	return `https://github.com/peak/s5cmd/releases/download/v${version}/${filename}.${extension}`
}

try {
	const version = core.getInput('version', { required: true })
	const downloadUrl = await getDownloadUrl(version)
	const archive = await tool.downloadTool(downloadUrl)
	const extract = downloadUrl.endsWith('.zip') ? tool.extractZip : tool.extractTar
	const toolPath = await extract(archive)
	core.addPath(toolPath)
} catch (err) {
	core.setFailed(String(err))
}
