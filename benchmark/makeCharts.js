const fs = require('fs')
const jsonFiles = fs.readdirSync('./results/')

const allDataPoints = jsonFiles.map((file) => {
    const data = JSON.parse(fs.readFileSync(`./results/${file}`, 'utf8'))
    return {
        name: file.replace('.json', ''),
        data,
    }
})

console.log({ allDataPoints })

const html = `<!DOCTYPE HTML>
        <html>

        <head>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>

        </head>

        <style>
            height: 33% !important;
        }
        </style>

        <body class='w-screen h-screen grid place-items-center'>
            <div id="grid" class='flex flex-wrap h-full w-full p-8'></div>
            <script defer>

            const allDataPoints = ${JSON.stringify(allDataPoints, null, 2)}

            const chart_data = {
                datasets: allDataPoints.map(({name, data}) => ({
                    label: name,
                    data: data.map(d => d.data),
                    backgroundColor: data.map((d, i) => d.label.startsWith('@mathi') ? 'black' : '#aaa'),
                }))
            };
            const canvas = document.createElement('canvas')
            const myChart = new Chart(canvas, { type: 'bar', data: chart_data });
                document.getElementById('grid').appendChild(canvas);
            </script>
        </body>

        </html>
        `
fs.writeFileSync(`./index.html`, html)
