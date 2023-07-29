const fs = require('fs')
const marked = require('marked')

const argv = process.argv.slice(2)
const dir = argv[0]
const name = argv[1]
const css = argv[2]
const title = argv[3]

const renderer = new marked.Renderer()
if (dir !== '/') {
  renderer.link = (href, title, text) => text
}
marked.setOptions({
  renderer,
  mangle: false,
  headerIds: false,
})

const markdown = fs.readFileSync(`docs/${name}.md`, 'utf8')
const base = fs.readFileSync('docs/rules.html', 'utf8')

const html = marked.parse(markdown)
const result = base.replace(/replace_body/g, html).replace(/replace_title/g, title).replace(/replace_css/g, css)

fs.writeFileSync(`public${dir}${name}.html`, result)