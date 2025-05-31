from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # Renders templates/home.html and serves home.css automatically
    return render_template('home.html')

@app.route('/simulation')
def simulation():
    # Renders templates/simulation.html, which links to simulation.css
    return render_template('simulation.html')

@app.route('/dashboard')
def dashboard():
    # Renders templates/dashboard.html, which links to dashboard.css
    return render_template('dashboard.html')

@app.route('/quiz')
def quiz():
    # Renders templates/quiz.html, which links to quiz.css
    return render_template('quiz.html')

@app.route("/result")
def result():
    return render_template("result.html")

if __name__ == '__main__':
    app.run(debug=True)
