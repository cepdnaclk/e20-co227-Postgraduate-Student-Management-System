package management.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.StringTemplateResolver;

@Configuration
public class ThymeleafConfig {
    @Bean
    public TemplateEngine stringTemplateEngine() {
        TemplateEngine templateEngine = new TemplateEngine();
        StringTemplateResolver stringTemplateResolver = new StringTemplateResolver();
        stringTemplateResolver.setTemplateMode("HTML");
        stringTemplateResolver.setCacheable(false); // Set true if caching is desired
        templateEngine.setTemplateResolver(stringTemplateResolver);
        return templateEngine;
    }

}
