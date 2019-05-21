package lab1.dShare.D_Share.PrinterModel;

import org.springframework.data.repository.CrudRepository;

import java.util.HashSet;
import java.util.Set;


public interface PrinterRepository extends CrudRepository<Printer, Integer> {
    Printer findByModel(String model);
    Printer findByOwnerName(String name);
    Set<Printer> findAllByOwnerId(long id);
}
