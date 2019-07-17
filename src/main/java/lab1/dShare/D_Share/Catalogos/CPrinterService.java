package lab1.dShare.D_Share.Catalogos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CPrinterService {

    @Autowired
    private CPrinterRepository cPrinterRepository;

    public List<CatalogPrinter> getAllPrinters() {
        return StreamSupport.stream(cPrinterRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public void addPrinter(CatalogPrinter printer) {
        if (cPrinterRepository.findByModel(printer.getModel()) == null)
            cPrinterRepository.save(printer);
    }

    public void deletePrinter(@PathVariable Long id){
        cPrinterRepository.deleteById(id);
    }

    public CatalogPrinter getPrinter(Long id) {
        return cPrinterRepository.findById(id).orElse(null);
    }

    public CatalogPrinter getPrinterByModel(String model) {
        return cPrinterRepository.findByModel(model);
    }
}
