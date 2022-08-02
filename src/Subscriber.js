

class Subscriber{

    constructor(name) {
        this.notifications = [];
        this.name= name;
        this. id = Date.now();
    }
    notify(notification){
        this.notifications.push(notification);
    }
}
export default Subscriber;