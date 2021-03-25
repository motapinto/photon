import Database from "./model/Database";
import { IEdge } from "./model/IEdge";

// Entity Nodes
import { countries } from "./populate/countries";
import { energy, nonRenewableEnergy, renewableEnergy } from "./populate/sectors";

(async () => {

    try {        
        const db = Database.getInstance();

        //Drops the database
        await db.drop();

        // Creates countries
        await Promise.all([
            db.createNode(countries[0]),
            db.createNode(countries[1]),
            db.createNode(countries[2]),
            db.createNode(countries[3]),
            db.createNode(countries[4]),
            db.createNode(countries[5]),
            db.createNode(countries[6]),
            db.createNode(countries[7]),
        ]);   

        // Creates Energy areas
        await Promise.all([
            db.createNode(energy[0]),
            db.createNode(energy[1]),
            db.createNode(energy[2]),
            db.createNode(renewableEnergy[0]),
            db.createNode(renewableEnergy[1]),
            db.createNode(renewableEnergy[2]),
            db.createNode(renewableEnergy[3]),
            db.createNode(renewableEnergy[4]),
            db.createNode(renewableEnergy[5]),
            db.createNode(nonRenewableEnergy[0]),
            db.createNode(nonRenewableEnergy[1]),
            db.createNode(nonRenewableEnergy[2]),
            db.createNode(nonRenewableEnergy[3]),
            db.createNode(nonRenewableEnergy[4]),
        ]);   

        const majorAreaEdge: IEdge = {
            direction: 'out',
            labels: ['majorArea'],
        }

        const subAreaEdge: IEdge = {
            direction: 'out',
            labels: ['subArea'],
        }
        await Promise.all([
            db.createEdge(energy[0], energy[1], majorAreaEdge),
            db.createEdge(energy[0], energy[2], majorAreaEdge),
            db.createEdge(energy[1], renewableEnergy[0], subAreaEdge),
            db.createEdge(energy[1], renewableEnergy[1], subAreaEdge),
            db.createEdge(energy[1], renewableEnergy[2], subAreaEdge),
            db.createEdge(energy[1], renewableEnergy[3], subAreaEdge),
            db.createEdge(energy[1], renewableEnergy[4], subAreaEdge),
            db.createEdge(energy[2], nonRenewableEnergy[0], subAreaEdge),
            db.createEdge(energy[2], nonRenewableEnergy[1], subAreaEdge),
            db.createEdge(energy[2], nonRenewableEnergy[2], subAreaEdge),
            db.createEdge(energy[2], nonRenewableEnergy[3], subAreaEdge),
            db.createEdge(energy[2], nonRenewableEnergy[4], subAreaEdge),
        ]);

        console.log("DB is now populated!");
        process.exit();
    } catch (error) {
        console.error(error);
    }
})();
