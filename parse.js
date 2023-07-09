const fs = require('fs')
const marked = require('marked')
marked.setOptions({
  mangle: false,
  headerIds: false
})

const argv = process.argv.slice(2)
const title = argv[0]
const name = argv[1]

const markdown = fs.readFileSync(`docs/${name}.md`, 'utf8')
const base = fs.readFileSync('docs/rules.html', 'utf8')

const html = marked.parse(markdown)
const result = base.replace(/replace_body/g, html).replace(/replace_title/g, title)

fs.writeFileSync(`public/${name}.html`, result)