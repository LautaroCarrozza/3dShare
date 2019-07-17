package lab1.dShare.D_Share.Catalogos;

import org.springframework.data.repository.CrudRepository;

public interface CPrinterRepository extends CrudRepository<CatalogPrinter, Long> {
    CatalogPrinter findByModel(String model);
}
