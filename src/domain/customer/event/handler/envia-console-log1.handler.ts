import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent>{
    
    handle(event: CustomerCreatedEvent): void {
        console.log(`Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated"`);
    }
    
}