let cocktailGrammar = {
    "SweetCocktails" : ["Piña Colada", "Cosmopolitan", "Classic Daiquiri", "Aperol Spritz", "Hurricane", "Mai Tai", "Classic Mojito", "Classic Margarita", "Tequila Sunrise", "Cuba Libre", "Sangria"],
    "SourCocktails" : ["Classic Margarita", "Classic Mojito", "Classic Daiquiri", "Whiskey Sour", "Tequila Sour", "Pisco Sour", "Vodka Sour"],
    "BitterCocktails" : ["Whiskey Sour", "Old-Fashioned", "Negroni", "Martini", "Manhattan"],

    "adjectives" : ["a great", "an amazing", "a good", "an excellent", "a surprisingly good", "an awesome", "a wonderful", "an incredible", "a delicious", "a fantastic", "a refreshing", "a lovely", "a fun"],
    "bitterAdjectives" : ["a sophisticated", "an interesting", "a flavorful", "an unusual"],

    "PinaColadaIngredients" :     ["<ul><li>1 1/2 cups frozen pineapple</li>\
                                    <li>1 1/2 cups ice</li>\
                                    <li>5 ounces aged rum</li>\
                                    <li>2 ounces cream of coconut</li>\
                                    <li>4 ounces pineapple juice</li>\
                                    <li>1 ounce lime juice</li>\
                                    <li>cocktail cherry (for garnish)</li></ul>"],
    "PinaColadaRecipe" :          ["<ol><li>Blend pineapple and ice until chunky.</li>\
                                    <li>Add the remaining ingredients and blend until smooth.</li>\
                                    <li>Serve garnished with a cocktail cherry and drink umbrellas.</li></ol>"],

    "CosmopolitanIngredients" :   ["<ul><li>1 ounce vodka</li>\
                                    <li>1 ounce unsweetened cranberry juice</li>\
                                    <li>1/2 ounce Cointreau</li>\
                                    <li>1/2 ounce lemon juice</li>\
                                    <li>1 lime wedge</li>\
                                    <li>1 teaspoon simple syrup</li>\
                                    <li>lime wheel (for garnish)</li></ul>"],
    "CosmopolitanRecipe" :        ["<ol><li>Blend pineapple and ice until chunky.</li>\
                                    <li>Add the remaining ingredients and blend until smooth.</li>\
                                    <li>Serve garnished with a cocktail cherry and drink umbrellas.</li></ol>"],

    "DaiquiriIngredients" :       ["<ul><li>1 1/2 ounces white rum</li>\
                                    <li>1 ounce lime juice</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>Lime slice (for garnish)</li></ul>"],
    "DaiquiriRecipe" :            ["<ol><li>Add the rum, lime juice, and syrup to a cocktail shaker.</li>\
                                    <li>Fill it with ice and shake until cold.</li>\
                                    <li>Strain into a cocktail glass.</li>\
                                    <li>Serve garnished with a lime slice.</li></ol>"],
                                    
    "AperolIngredients" :         ["<ul><li>2 ounces Aperol</li>\
                                    <li>3 ounces sparkling wine</li>\
                                    <li>1 ounce soda water</li>\
                                    <li>Ice</li>\
                                    <li>orange wedge (for garnish)</li></ul>"],
    "AperolRecipe" :              ["<ol><li>Add the Aperol to a glass filled with ice and stir.</li>\
                                    <li>Top with the sparkling wine and soda water.</li>\
                                    <li>Squeeze in the orange wedge and stir gently, then serve with a straw to minimize dilution.</li></ol>"],
                                    
    "HurricaneIngredients" :      ["<ul><li>4 ounces rum</li>\
                                    <li>1 ounce orange juice</li>\
                                    <li>1 ounce lime juice</li>\
                                    <li>1 1/2 ounces passion fruit syrup</li>\
                                    <li>1 tablespoon grenadine</li>\
                                    <li>orange wedge and cocktail cherry (for garnish)</li></ul>"],
    "HurricaneRecipe" :           ["<ol><li>Add the dark rum, light rum, orange juice, lime juice, passion fruit syrup, and grenadine to a cocktail shaker.</li>\
                                    <li>Fill it with ice and shake it until cold.</li>\
                                    <li>Strain into a cocktail glass.</li>\
                                    <li>Garnish with an orange wedge and cherry.</li></ol>"],

    "MaiTaiIngredients" :         ["<ul><li>1 1/2 ounces aged rum</li>\
                                    <li>1/2 ounce orange liqueur (Curaçao, Cointreau or Grand Marnier)</li>\
                                    <li>3/4 ounce lime juice</li>\
                                    <li>1 ounce orgeat syrup</li>\
                                    <li>1/2 ounce dark rum</li>\
                                    <li>Fresh mint, cocktail cherry, pineapple slice, lime wedge (for garnish)</li></ul>"],
    "MaiTaiRecipe" :              ["<ol><li>Place the aged rum, orange liqueur, lime juice, and orgeat syrup in a cocktail shaker.</li>\
                                    <li>Add ice and shake until cold.</li>\
                                    <li>Strain the drink into an ice-filled glass.</li>\
                                    <li>Top with the dark rum.</li>\
                                    <li>Garnish with fresh mint, a lime wedge, cocktail cherry and pineapple slice.</li></ol>"],

    "MojitoIngredients" :         ["<ul><li>3 mint leaves, plus additional for garnish</li>\
                                    <li>1 ounce lime juice</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>2 ounces white rum</li>\
                                    <li>4 ounces soda water</li></ul>"],
    "MojitoRecipe" :              ["<ol><li>In a cocktail shaker, muddle the mint leaves with the lime juice and syrup.</li>\
                                    <li>Add the rum and fill the cocktail shaker with ice.</li>\
                                    <li>Shake until cold.</li>\
                                    <li>Place ice into a glass, and strain in the liquid.</li>\
                                    <li>Top off the glass with soda water.</li>\
                                    <li>Garnish with additional mint leaves.</li></ol>"],

    "MargaritaIngredients" :      ["<ul><li>1 1/2 ounces tequila blanco</li>\
                                    <li>1 ounce Cointreau</li>\
                                    <li>3/4 ounce fresh lime juice</li>\
                                    <li>Sea salt (for the rim)</li>\
                                    <li>Lime wedge (for garnish)</li></ul>"],
    "MargaritaRecipe" :           ["<ol><li>Cut a notch in a lime wedge, then run the lime around the rim of a glass.</li>\
                                    <li>Dip the edge of the rim into a plate of salt.</li>\
                                    <li>Place all ingredients in a cocktail shaker with 4 ice cubes and shake until cold.</li>\
                                    <li>Strain the margarita into the glass with the salted rim.</li>\
                                    <li>Fill the glass with ice and serve.</li></ol>"],

    "TequilaSunriseIngredients" : ["<ul><li>2 ounces tequila</li>\
                                    <li>4 ounces orange juice</li>\
                                    <li>3/4 ounce grenadine syrup</li>\
                                    <li>Ice</li>\
                                    <li>Cocktail cherry, orange juice (for garnish)</li></ul>"],
    "TequilaSunriseRecipe" :      ["<ol><li>Fill a highball glass with ice.</li>\
                                    <li>Pour in the tequila and orange juice and stir.</li>\
                                    <li>Pour the grenadine into center of the drink and it will sink to the bottom.</li>\
                                    <li>Stir gently for sunrise gradient effect.</li>\
                                    <li>Garnish with an orange slice and cocktail cherry.</li></ol>"],

    "CubaLibreIngredients" :      ["<ul><li>1 1/2 ounces white rum</li>\
                                    <li>3 ounces Coca-Cola</li>\
                                    <li>1 teaspoon lime juice</li>\
                                    <li>Ice</li>\
                                    <li>Lime wedge (for garnish)</li></ul>"],
    "CubaLibreRecipe" :           ["<ol><li>Fill a highball glass with ice.</li>\
                                    <li>Add the rum, Coca-Cola and lime juice and stir gently.</li>\
                                    <li>Garnish with the lime wedge.</li></ol>"],

    "SangriaIngredients" :        ["<ul><li>1/2 medium apple, sliced into small pieces</li>\
                                    <li>1/2 medium orange, sliced into small pieces</li>\
                                    <li>3-4 Tbsp brown sugar</li>\
                                    <li>1/3 cup brandy</li>\
                                    <li>1 bottle dry red wine</li>\
                                    <li>Ice</li></ul>"],
    "SangriaRecipe" :             ["<ol><li>Add apples, oranges, and sugar to a large pitcher and muddle with a muddler or wooden spoon.</li>\
                                    <li>Add orange juice and brandy and muddle again to combine.</li>\
                                    <li>Add red wine and stir to combine.</li>\
                                    <li>Add ice and stir to chill.</li>\
                                    <li>Serve with ice and orange segments.</li></ol>"],

    "WhiskeySourIngredients" :    ["<ul><li>2 ounces bourbon whiskey</li>\
                                    <li>1 ounce lemon juice</li>\
                                    <li>3/4 ounce simple syrup</li>\
                                    <li>Ice</li>\
                                    <li>Orange peel and a cocktail cherry (for garnish)</li></ul>"],
    "WhiskeySourRecipe" :         ["<ol><li>Add the bourbon whiskey, lemon juice, and syrup to a cocktail shaker.</li>\
                                    <li>Fill with a handful of ice and shake until very cold.</li>\
                                    <li>Strain the drink into a lowball or Old Fashioned glass.</li>\
                                    <li>Serve with ice, an orange peel and a cocktail cherry.</li></ol>"],

    "TequilaSourIngredients" :    ["<ul><li>2 ounces tequila reposado</li>\
                                    <li>1 ounce lemon juice</li>\
                                    <li>1/2 ounce lime juice</li>\
                                    <li>2 teaspoons simple syrup</li>\
                                    <li>2 dashes Angostura bitters</li>\
                                    <li>1 egg white</li>\
                                    <li>Cocktail cherry and lime wedge (for garnish)</li></ul>"],
    "TequilaSourRecipe" :         ["<ol><li>Add the tequila, lemon juice, lime juice, syrup, bitters, and egg white to a cocktail shaker without ice.</li>\
                                    <li>Shake for 15 seconds.</li>\
                                    <li>Add the ice to the cocktail shaker and shake again for 30 seconds.</li>\
                                    <li>Strain the drink into a glass; the foam will collect at the top.</li>\
                                    <li>Serve with a lime wedge and a cocktail cherry.</li></ol>"],
                                    
    "PiscoSourIngredients" :      ["<ul><li>2 ounces pisco</li>\
                                    <li>1 ounce lime juice</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>1 egg white</li>\
                                    <li>3 dashes bitters (for garnish)</li></ul>"],
    "PiscoSourRecipe" :           ["<ol><li>Add the pisco, lime juice, simple syrup and egg white to a cocktail shaker without ice.</li>\
                                    <li>Shake for 15 seconds.</li>\
                                    <li>Add the ice to the cocktail shaker and shake again for 30 seconds.</li>\
                                    <li>Strain the drink into a glass; the foam will collect at the top.</li>\
                                    <li>Garnish with bitters on the foam.</li></ol>"],

    "VodkaSourIngredients" :      ["<ul><li>2 ounces vodka</li>\
                                    <li>1 ounce lemon juice</li>\
                                    <li>1/2 ounce lime juice</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>2 dashes Angostura bitters</li>\
                                    <li>1 egg white</li>\
                                    <li>Cocktail cherry and lemon wedge (for garnish)</li></ul>"],
    "VodkaSourRecipe" :           ["<ol><li>Add the vodka, lemon juice, lime juice, syrup, bitters, and egg white to a cocktail shaker without ice.</li>\
                                    <li>Shake for 15 seconds.</li>\
                                    <li>Add the ice to the cocktail shaker and shake again for 30 seconds.</li>\
                                    <li>Strain the drink into a glass; the foam will collect at the top.</li>\
                                    <li>Serve with ice, a lemon wedge, and a cocktail cherry.</li></ol>"],

    "OldFashionedIngredients" :   ["<ul><li>2 ounces bourbon</li>\
                                    <li>1/4 ounce simple syrup</li>\
                                    <li>2 dashes of Angostura bitters</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>Ice</li>\
                                    <li>1 orange twist</li>\
                                    <li>Cocktail cherry (for garnish)</li></ul>"],
    "OldFashionedRecipe" :        ["<ol><li>In a mixing glass, combine the bourbon, simple syrup and bitters.</li>\
                                    <li>Fill the glass with ice, stir well and strain into an ice-filled rocks glass.</li>\
                                    <li>Pinch the orange twist over the drink, add it to the glass and garnish with the skewered cherry.</li></ol>"],

    "NegroniIngredients" :        ["<ul><li>1 1/3 ounces frozen gin</li>\
                                    <li>1 ounce sweet vermouth</li>\
                                    <li>2/3 ounce Campari</li>\
                                    <li>1/2 ounce simple syrup</li>\
                                    <li>Ice</li>\
                                    <li>1 orange wheel (for garnish)</li></ul>"],
    "NegroniRecipe" :             ["<ol><li>Fill a rocks glass with ice.</li>\
                                    <li>Add the gin, vermouth and Campari and stir well.</li>\
                                    <li>Garnish with the orange wheel.</li></ol>"],

    "MartiniIngredients" :        ["<ul><li>3 ounces gin</li>\
                                    <li>1 ounce dry vermouth</li>\
                                    <li>Ice</li>\
                                    <li>1 lemon twist (for garnish)</li></ul>"],
    "MartiniRecipe" :             ["<ol><li>Fill a pint glass with ice.</li>\
                                    <li>Add the gin and vermouth and stir well.</li>\
                                    <li>Strain into a chilled martini glass or coupe and garnish with the lemon twist.</li></ol>"],

    "ManhattanIngredients" :      ["<ul><li>2 ounces rye whiskey</li>\
                                    <li>1 ounce sweet vermouth</li>\
                                    <li>2 dashes of Angostura bitters</li>\
                                    <li>Ice</li>\
                                    <li>1 maraschino cherry (for garnish)</li></ul>"],
    "ManhattanRecipe" :           ["<ol><li>Fill a pint glass with ice.</li>\
                                    <li>Add the rye, vermouth and bitters and stir well.</li>\
                                    <li>Strain into a chilled coupe and garnish with the cherry.</li></ol>"]
}
