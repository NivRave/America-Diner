/*This is the basic-initial setup "database".
 * It contains 10 courses from our 4 categories.
 */

function basicSetup() {
                                                                    /*Categories: 'light','dirty','desert','drinks' */
    this.basicMenu = [new courseObj('Burger', '450g beef burger with american cheese, ranch and lettuce', '55', '50', 'BurgerDish.jpg', 'dirty', 'Gluten Dairy'),
        new courseObj('Dirty Fries', 'Home-made potato chips fried in bacon fat, topped by gravy, bacon, cheddar cheese and green onions', '25', '20', 'DirtyFries.jpg', 'light', 'Dairy Spicy'),
        new courseObj('American Pancakes', 'High carb-High sugar buttermilk pancakes topped with butter and maple syrup', '35', '30', 'PancakesPlain.jpg', 'desert', 'Gluten Dairy'),
        new courseObj('Philly CheeseSteak', 'Bun-Beef-Chilly-Cheese-Bun', '45', '40', 'PhillyCheese.jpg', 'dirty', 'Gluten Dairy Spicy'),
        new courseObj('Steak N Eggs', '300g beef fillet, cooked veggies and 2 sunny-side-up eggs', '75', '70', 'SteakNEggs.jpg', 'light', ''),
        new courseObj('Homemade Beer', 'Our 8.9% homemade fruity flavored light-beer', '20', '18', 'HomeMadeBeer.jpg', 'drinks', 'Gluten'),
        new courseObj('Becks', '5.2% light-beer', '20', '18', 'Becks.jpg', 'drinks', 'Gluten'),
        new courseObj('Grilled Cheese', 'A mix of grilled-cheese with ranch sauce', '27', '25', 'GrilledCheese.jpg', 'light', 'Dairy'),
        new courseObj('Thanksgiving Turkey', 'Needless to say, isnt it?', '80', '75', 'Turkey.jpg', 'light', ''),
        new courseObj('Smoked Ribs', 'Short cow ribs marinated in BBQ and smoked for as long as there is', '90', '80', 'SmokedRibs.jpg', 'dirty', 'Spicy'),
        new courseObj('DFDCB', 'Deep fried doritos chicken burger', '55', '50', 'DeepFriedDoritosBreadedBurger.jpg', 'dirty', 'Gluten Dairy Spicy'),
        new courseObj('Carbonara Pasta', 'Pasta, cream, bacon - mixed', '60', '50', 'Carbonara.jpg', 'dirty', 'Gluten Dairy'),
        new courseObj('American Pie', 'American creampie it is', '35', '30', 'AmericanPie.jpg', 'desert', 'Gluten Dairy')
    ]
    //Return the created basic menu
    this.getBasicMenu = function () {
        return this.basicMenu;
    }
}
