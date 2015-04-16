
var ParseLunchObject = Parse.Object.extend("Lunch");
var ParseLunchCollection = Parse.Collection.extend({
        model: ParseLunchObject
    });

class LunchModel {
    constructor(data) {
        this.name = data.name;
        this.place = data.place;
        this.date = data.date;
        this.lunchEntity = data.lunchEntity;
    }

    save() {
        var self = this;
        var dataToSave = {
            name: this.name,
            place: this.place,
            date: this.date
        };

        return new Promise(function(resolve, reject){
            if(self.lunchEntity === undefined) {

                var parseLunchObject = new ParseLunchObject();
                parseLunchObject.save(dataToSave, {
                    success: function(lunchEntity) {
                        self.lunchEntity = lunchEntity;
                        resolve();

                    }
                });
            } else {
                self.lunchEntity.save(dataToSave, {
                    success: function() {
                        resolve();
                    }
                })
            }
        });
    }

    remove() {
        if(this.lunchEntity) {
            return new Promise(function(resolve, reject) {
                this.lunchEntity.destroy({
                    success: function() {
                        resolve();

                    }
                });
            });
        }

    }

    static getAll() {
        var collection = [];

        return new Promise(function(resolve, reject) {
            ParseLunchCollection.fetch({
                success: function(parseCollection) {
                    parseCollection.forEach(function(item){
                        collection.push(new LunchModel({
                            name: item.get('name'),
                            place: item.get('place'),
                            date: item.get('date'),
                            lunchEntity: item
                        }));
                    });

                    resolve(collection);
                }
            })
        });
    }
}

export { LunchModel }

