package lab1.dShare.D_Share.PrinterModel;

import org.springframework.data.repository.CrudRepository;


public interface PrinterRepository extends CrudRepository<Printer, Integer> {
    Printer findByModel(String model);
    Printer findByOwnerName(String name);

}
