from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor


app = Flask(__name__)
CORS(app)

# Home route
@app.route("/")
def home():
    return "Backend is working!"

# Predict route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from React
        data = request.get_json()
        symbol = data["symbol"]

        print("Received symbol:", symbol)

        # Fetch stock data
        stock_data = yf.download(symbol, period="5d", group_by='column')
        stock_data.columns = stock_data.columns.droplevel(1)

        if stock_data.empty:
            print("No data found for:", symbol)
            return jsonify({
                "linear_regression": 0,
                "knn": 0,
                "history": []
            })

        print("\nStock Data:\n")
        print(stock_data)

        #  Convert data for frontend
        history = []

        stock_data = stock_data.reset_index()

        print("\nAfter Reset Index:\n")
        print(stock_data)

        for i in range(len(stock_data)):
            date_value = stock_data.iloc[i]["Date"]
            close_value = stock_data.iloc[i]["Close"]

            print("Row:", date_value, close_value)

            history.append({
                "date": str(date_value).split(" ")[0],
                "close": float(close_value)
            })
        prices = stock_data["Close"].values
        
        import numpy as np
        from sklearn.linear_model import LinearRegression
        from sklearn.neighbors import KNeighborsRegressor 
        
        X = np.array(range(len(prices))).reshape(-1, 1)
        y = prices
        
        #Linear Regression 
        lr_model = LinearRegression()
        lr_model.fit(X, y)
        lr_prediction = lr_model.predict([[len(prices)]])[0]
        
        #KNN
        knn_model = KNeighborsRegressor(n_neighbors=2)
        knn_model.fit(X, y)
        knn_prediction = knn_model.predict([[len(prices)]])[0]

        

        print("\nFinal history:\n", history)
        print("Sending History",history)

        return jsonify({
             "linear_regression": float(lr_prediction),
             "knn": float(knn_prediction),
             "history": history
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({
            "linear_regression": 0,
            "knn": 0,
            "history": []
        })

# Run server
if __name__ == "__main__":
    app.run(debug=True)
