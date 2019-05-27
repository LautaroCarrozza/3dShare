package lab1.dShare.D_Share.OrderModel;

import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface OrderRepository extends CrudRepository<Order, Long> {
    Set<Order> getByClientId(long id);
    Set<Order> getByProducerId(long id);

}