import deliveriesRepository from "../repositories/deliveries.repository.js";

class DeliveriesService {
  getDeliveries(options) { return deliveriesRepository.getAll(options); }
}
export default new DeliveriesService();
