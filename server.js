const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 7000
// set template engine

// app.use(ejsLayouts)
// app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(__dirname + '/client/public'))
console.log(path.join(__dirname, '/client/public'))
app.set('view-engine', 'ejs')

app.set('views', path.join(__dirname, 'client/resources/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(PORT, () => console.log('Server is up'))