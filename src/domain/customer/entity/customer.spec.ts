import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log2.handler";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests",()=>{

    it("should throw error when id is empty",() =>{
        expect(() => {
            let customer = new Customer("","John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty",() =>{
        expect(() => {
            let customer = new Customer("123","");
        }).toThrowError("Name is required");
    });

    it("should change name",() =>{
        //Arrange
        let customer = new Customer("123","John");
        
        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should change name",() =>{
        //Arrange
        let customer = new Customer("123","John");
        
        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer",() =>{
        let customer = new Customer("1","Customer 1");
        const address = new Address("Street 1",123,"13330-250","São Paulo");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
     
    });

    it("should deactivate customer",() =>{
        let customer = new Customer("1","Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
     
    });


    it("should throw error when address is undefined when you activate a customer",() =>{
       
        expect(()=>{
            const customer = new Customer("1","Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
     
    });

    it("should add reward points",() =>{
       
        const customer = new Customer("1","Customer 1");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

     
    });

    it("should notify all events handler when created new customer", () => {
        
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1,"handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2,"handle");
       
        //const spyEventHandler2 = jest.spyOn(eventHandler2,"handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        let customer = new Customer("123","Customer1",eventDispatcher);

       
        
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("should notify event handler when change address", () => {
        
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new EnviaConsoleLogHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler,"handle");
       

        eventDispatcher.register("ChangeAddressEvent", eventHandler);

        let customer = new Customer("123","Customer1");

        const address = new Address("RUA 1",1,"71111111","TESTE");
        customer.changeAddress(address,eventDispatcher);
       
        
        expect(spyEventHandler1).toHaveBeenCalled();

    });

});