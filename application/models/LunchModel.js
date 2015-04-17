
var ParseLunchObject = Parse.Object.extend("Lunch");
var ParseLunchCollection = Parse.Collection.extend({model: ParseLunchObject});
var parseLunchObject = new ParseLunchObject;
var parseLunchCollection = new ParseLunchCollection;

class LunchModel {
    constructor(data) {
        this.name = data.name;
        this.place = data.place;
        this.date = data.date;
        this.lunchEntity = data.lunchEntity;
    }

    save() {
        var dataToSave = {
            name: this.name,
            place: this.place,
            date: this.date
        };

        return new Promise((resolve, reject) => {
            if(this.lunchEntity === undefined) {
                parseLunchObject.save(dataToSave, {
                    success: lunchEntity => {
                        this.lunchEntity = lunchEntity;
                        resolve();
                    }
                });
            } else {
                this.lunchEntity.save(dataToSave, {
                    success: () =>  resolve()
                });
            }
        });
    }

    remove() {
        if(this.lunchEntity) {
            return new Promise((resolve, reject) => {
                this.lunchEntity.destroy({
                    success: () =>  resolve()
                });
            });
        }

    }

    static getAll() {
        var collection = [];

        return new Promise((resolve, reject) => {
            parseLunchCollection.fetch({
                success: (parseCollection) => {
                    parseCollection.forEach((item) => {
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

