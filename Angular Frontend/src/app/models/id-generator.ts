export class IdGenerator {
    static generateUniqueId(): number {
      // Get the current timestamp
      const timestamp = Date.now();
  
      // Generate a random number
      const randomNum = Math.floor(Math.random() * 1000000);
  
      // Combine the timestamp and random number to create a unique ID
      const uniqueId = timestamp + randomNum;
  
      return uniqueId;
    }
}