package lab1.dShare.D_Share.Catalogos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/printers")
public class CPrinterController {

    @Autowired
    private CPrinterService cPrinterService;

    @GetMapping()
    public List<CatalogPrinter> getAllPrinters(){
        return cPrinterService.getAllPrinters();
    }

    @PostMapping("/add")
    public void addCPrinter(@RequestParam String model) {
        CatalogPrinter catalogPrinter = new CatalogPrinter(model);
        cPrinterService.addPrinter(catalogPrinter);
    }

    @PutMapping("/delete/{id}")
    public void deleteCPrinter(@PathVariable Long id){
        cPrinterService.deletePrinter(id);
    }

    @GetMapping("/{id}")
    public CatalogPrinter getCPrinter(@PathVariable Long id){
        return cPrinterService.getPrinter(id);
    }

    @GetMapping("/byModel/{model}")
    public CatalogPrinter getCPrinterByModel(@PathVariable String model){
        return cPrinterService.getPrinterByModel(model);
    }

}
