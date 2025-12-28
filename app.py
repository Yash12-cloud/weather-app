import os
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise RuntimeError("OPENWEATHER_API_KEY not set")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "city parameter required"}), 400

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    res = requests.get(BASE_URL, params=params)

    if res.status_code != 200:
        return jsonify({"error": "city not found"}), 404

    data = res.json()

    return jsonify({
        "city": data["name"],
        "temp": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "weather": data["weather"][0]["description"]
    })

if __name__ == "__main__":
    app.run()
