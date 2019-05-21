package lab1.dShare.D_Share.PrinterModel;

import org.springframework.data.repository.CrudRepository;

import java.util.HashSet;


public interface PrinterRepository extends CrudRepository<Printer, Integer> {
    Printer findByModel(String model);
    Printer findByOwnerName(String name);

}
