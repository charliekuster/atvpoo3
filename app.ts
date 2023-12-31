import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
    }

    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date) {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        const user = this.users.find(user => user.email === userEmail)
        const bikeRents = 
            this.rents.filter(rent => rent.bike.id === bikeId && !rent.dateReturned)
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string): void {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId && 
            rent.user.email === userEmail &&
            rent.dateFrom < today
        )
        if (rent) {
            rent.dateReturned = today
        }
    }
}