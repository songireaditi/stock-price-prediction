from flask import Flask, jsonify
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is working!"

@app.route("/predict")
def predict():
    return jsonify({
        "linear_regression": 200,
        "knn": 195
    })

if __name__ == "__main__":
    app.run(debug=True)