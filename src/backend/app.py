import pandas as pd
from flask import Flask, request, jsonify
import os

# create flask app
app = Flask(__name__)

# load dataset safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(BASE_DIR, "..", "data", "tourism.csv")
dataset = pd.read_csv(dataset_path)


# home route
@app.route("/")
def home():
    return "Roavo backend running"


# recommendation route
@app.route("/recommend", methods=["POST"])
def recommend():

    try:
        data = request.json

        budget = int(data["budget"])
        days = int(data["days"])
        travel_type = data["travel_type"]
        interest = data["interest"]
        place = data["place"]

        # CASE 1: user already selected a place
        if place and place.strip() != "":
            itinerary = []

            for i in range(1, days + 1):
                itinerary.append(f"Day {i}: Explore {place}")

            return jsonify({
                "selected_place": place,
                "itinerary": itinerary
            })


        # CASE 2: recommend places

        # convert INR to USD
        budget_per_day = (budget / days) / 83

        # filter by interest
        if interest in dataset.columns:
            filtered = dataset[dataset[interest] == 1]
        else:
            filtered = dataset

        # try budget filtering
        budget_filtered = filtered[filtered["Avg Cost (USD/day)"] <= budget_per_day]

        # if budget filter gives results use it
        if len(budget_filtered) > 0:
            filtered = budget_filtered

        # sort by rating
        filtered = filtered.sort_values(by="Google review rating", ascending=False)

        # get unique place names
        places = filtered["Place"].dropna().unique().tolist()

        # return top 5
        places = places[:5]

        return jsonify({
            "recommended_places": places
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


# run server
if __name__ == "__main__":
    app.run(debug=True)