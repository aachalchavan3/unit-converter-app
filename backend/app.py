from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/convert', methods=['POST'])
def convert():
    data = request.json
    value = float(data['value'])
    from_unit = data['from']
    to_unit = data['to']

    result = None

    # SAME UNIT (IMPORTANT FIX ✅)
    if from_unit == to_unit:
        result = value

    # LENGTH
    elif from_unit == "m" and to_unit == "km":
        result = value / 1000
    elif from_unit == "km" and to_unit == "m":
        result = value * 1000

    # WEIGHT
    elif from_unit == "kg" and to_unit == "g":
        result = value * 1000
    elif from_unit == "g" and to_unit == "kg":
        result = value / 1000

    # TIME
    elif from_unit == "sec" and to_unit == "min":
        result = value / 60
    elif from_unit == "min" and to_unit == "sec":
        result = value * 60

    # TEMPERATURE
    elif from_unit == "c" and to_unit == "f":
        result = (value * 9/5) + 32
    elif from_unit == "f" and to_unit == "c":
        result = (value - 32) * 5/9

    else:
        result = "Invalid Conversion"

    return jsonify({"result": result})


if __name__ == '__main__':
    app.run(debug=True)