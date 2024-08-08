from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def home():
    svg_code = '''
    <svg width="400" height="180">
        <rect x="50" y="20" width="150" height="150" style="fill:blue;stroke-width:3;stroke:black" />
        <circle cx="200" cy="90" r="50" style="fill:red;stroke-width:3;stroke:black" />
        <line x1="50" y1="150" x2="350" y2="150" style="stroke:rgb(255,0,0);stroke-width:2" />
    </svg>
    '''
    return render_template_string('''
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>SVG Drawing</title>
      </head>
      <body>
        <h1>矢量绘制示例</h1>
        <div>
          {{ svg_code | safe }}
        </div>
      </body>
    </html>
    ''', svg_code=svg_code)

if __name__ == '__main__':
    app.run(debug=True)