  class CoffeeMachine {
    constructor() {
      this.waterLevel = 0;
    }
  
    fillWater(level) {
      this.waterLevel += level;
      console.log(`Water level increased to ${this.waterLevel}ml.`);
    }
  
    brewCoffee() {
      if (this.waterLevel >= 200) {
        console.log("Brewing a delicious cup of coffee!");
        this.waterLevel -= 200;
      } else {
        console.log("Not enough water. Please fill the water tank.");
      }
    }
  }
  
  // Create an instance of CoffeeMachine
  const myCoffeeMachine = new CoffeeMachine();
  
  // Interact with the CoffeeMachine
  myCoffeeMachine.fillWater(300); // Water level increased to 300ml.
  myCoffeeMachine.brewCoffee();   // Brewing a delicious cup of coffee!
  myCoffeeMachine.brewCoffee();   // Not enough water. Please fill the water tank.
  