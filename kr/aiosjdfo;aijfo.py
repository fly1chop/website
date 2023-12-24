class Vehicular:
    def __init__(self, color, brand, model, velocity):
        self.color = color
        self.brand = brand
        self.model = model
        self.velocity = velocity






    def print_info(self):
        print(f"Color: {self.color}")
        print(f"Brand: {self.brand}")
        print(f"Model: {self.model}")
        print(f"Velocity: {self.velocity} km/h")



    def increase_speed(self, increment):
        self.velocity += increment





    def decrease_speed(self, decrement):
        if self.velocity - decrement >= 0:
            self.velocity -= decrement



car = Vehicular("Red", "Toyota", "Corolla", 60) # Color, Brand, Model, Speed
car2 = Vehicular("Blue", "BMW", "M4", 80)


car.print_info()
# 결과값
# Color: Red
# Brand: Toyota
# Model: Corolla
# Velocity: 60 km/h
car.increase_speed(40)
car.print_info()
# 결과값
# Color: Red
# Brand: Toyota
# Model: Corolla
# Velocity: 100 km/h
car2.print_info()
# 결과값
# Color: Blue
# Brand: BMW
# Model: M4
# Velocity: 80 km/h
car.decrease_speed(20)
# 결과값
# Color: Blue
# Brand: BMW
# Model: M4
# Velocity: 60 km/h


print(car)











class Motorcycle(Vehicular):
    def __init__(self, color, brand, model, velocity, engine_size):
        super().__init__(color, brand, model, velocity)
        self.engine_size = engine_size

    def print_info(self):
        super().print_info()
        print(f"Engine Size: {self.engine_size} cc")

m1 = Motorcycle("Black","Hyndai","Sonana",100,30)
m1.increase_speed(30)
m1.print_info()



