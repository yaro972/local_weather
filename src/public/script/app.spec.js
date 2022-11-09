describe("App", function(){
    it("should make a first test", function() {
         expect(true).toBe(true);
    });
});

describe('Librairie de conversion', function(){
    describe("Conversion de Kelvin à farenheit", function(){
        it("devrait convertir 10 kelvin en -441.69 farenheit", function(){
            expect(convKtoF(10)).toBe(-442);
        });
    });
describe("Conversion de Kelvin à Celsius", function(){
    it("devrait convertir 10 kelvin en -263.15 celsius", function(){
            expect(convKtoC(10)).toBe(-264);
        });
    });
    
});


