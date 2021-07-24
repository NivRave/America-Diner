function basicSetup() {
                                                                    /*'light','dirty','desert','drinks'*/
    this.basicMenu = [new courseObj('Burger', '450g beef burger with american cheese, ranch and lettuce', '55', '50', ' ', 'dirty', 'a'),
        new courseObj('Dirty Fries', 'Home-made potato chips fried in bacon fat, topped by gravy, bacok, cheddar cheese and green onions', '25', '20', ' ', 'light', 'b'),
        new courseObj('American Pancakes', 'High carb-High sugar buttermilk pancakes topped with butter and maple syrup', '35', '30', '', 'desert', 'c'),
        new courseObj('Philly CheeseSteak', 'Bun-Beef-Chilly-Cheese-Bun', '45', '40', '', 'dirty', 'd'),
        new courseObj('Steak N Eggs', '300g beef fillet, cooked veggies and 2 sunny-side-up eggs', '75', '70', '', 'light', 'e'),
        new courseObj('Homemade Beer', 'Our 8.9% homemade fruity flavored light-beer', '20', '18', '', 'drinks', 'f'),
        new courseObj('Becks', '5.2 light-beer', '20', '18', '', 'drinks', 'g'),
        new courseObj('Grilled Cheese', 'A mix of grilled-cheese with ranch sauce', '27', '25', '', 'light', 'h'),
        new courseObj('Thanksgiving Turkey', 'Needless to say, isnt it?', '80', '75', '', 'light', 'i'),
        new courseObj('Smoked Ribs', 'Short cow ribs marinated in BBQ and smoked for as long as there is', '90', '80', '', 'dirty', 'j'),
        new courseObj('DFDCB', 'Deep fried doritos chicken burger', '55', '50', '', 'dirty', 'k'),
        new courseObj('Carbonara Pasta', 'Pasta, cream, bacon - mixed', '60', '50', '', 'dirty', 'l'),
        new courseObj('American Pie', 'American cream pie it is', '35', '30', '', 'desert', 'm')
    ]
    //this.basicMenu = [
    //    '{"name":"Burger","description":"burgers","price":"25","mPrice":"1","img":" ","category":"light","sTags":"a"}',
    //    '{"name":"Pancakes","description":"panc","price":"2","mPrice":"3","img":" ","category":"dirty","sTags":"b"',
    //    '{"name":"Carbonara","description":"carbooo","price":"7","mPrice":"1","img":" ","category":"drinks","sTags":"c"',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    //'{"name":" ","description":" ","price":" ","mPrice":" ","img":" ","category":" ","sTags":" "}',
    //    '{"name":"Smoked ribs","description":"bbqqs","price":"15","mPrice":"2","img":" ","category":"desert","sTags":"d"}'
    //]

    this.getBasicMenu = function () {
        return this.basicMenu;
    }
}
