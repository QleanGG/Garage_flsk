import json
from flask import Flask, render_template, url_for,request,redirect,jsonify

app = Flask(__name__)

try:
    with open('cars.json', 'r') as file:
        car_lst = json.load(file)
except FileNotFoundError:
    car_lst = []

def save_json(filename='cars.json'):
    try:
        with open(filename, 'w') as file:
            json.dump(car_lst, file, indent=4)  # Use indentation for a more readable JSON file
        return True
    except Exception as e:
        print(f"Error saving JSON: {str(e)}")
        return False

@app.route('/')
def index():
    return render_template('index.html', car_lst=car_lst)

@app.route('/add_car', methods =['POST'])
def new_car():
    global car_lst
    req_manufacture = request.form['carManufacture']
    req_color = request.form['carColor']
    req_model = request.form['carModel']
    req_license = request.form['license']
    car_lst.append({"license":req_license,"manufacture":req_manufacture,"color":req_color,"model":req_model})

    # saves the updated list to the json file
    save_json()

    return redirect('/')

@app.route('/get_cars', methods =['GET'])
def get_cars():
    global car_lst
    return jsonify(car_lst)

@app.route('/del_car/<string:license>', methods = ['GET','POST'])
def del_car(license):
    global car_lst
     # Search for the car with the provided license in car_lst
    found_car = None
    for car in car_lst:
        if car['license'] == license:
            found_car = car
            break
    if found_car:
        # Remove the car from the list
        car_lst.remove(found_car)
        
        # Save the updated data to JSON
        save_json()

        return redirect('/')
    else:
        return jsonify({'error': 'Car not found'}, 404)
    redirect
        

@app.route('/delete_all' ,methods = ['POST'])
def delete_all():
    global car_lst
    car_lst = []
    if save_json():
        return 'Database Deleted'
    else:
        return 'Error Deleting Database', 500  # Return a 500 Internal Server Error status code for errors


@app.route('/edit_car/<string:license>', methods=['POST'])
def edit_car(license):
    global car_lst
    req_data = request.get_json()
    found_car = None

    # Search for the car with the provided license in car_lst
    for car in car_lst:
        if car['license'] == license:
            found_car = car
            break

    if found_car:
        # Update the car's data with the data from the request
        found_car.update(req_data)
        save_json()
        return jsonify({'message': 'Car edited successfully'})
    else:
        return jsonify({'error': 'Car not found'}, 404)


if __name__ == '__main__':
    app.run(debug=True)


