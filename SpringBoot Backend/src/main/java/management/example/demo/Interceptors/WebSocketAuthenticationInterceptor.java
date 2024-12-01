package management.example.demo.Interceptors;

import management.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;

@Component
public class WebSocketAuthenticationInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // Extract the token from the URL query parameters
        String jwtToken = (String) accessor.getHeader("simpDestination"); // Get the destination (URL)
        System.out.println(jwtToken);

        if (jwtToken != null) {
            String token = extractTokenFromQueryParameters(jwtToken); // Extract token from URL
            System.out.println(token);

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Remove "Bearer " prefix
                String username = jwtUtil.extractUsername(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(token, userDetails)) {
                    accessor.setUser(new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()));
                }
            }
        }

        return message;
    }

    private String extractTokenFromQueryParameters(String url) {
        try {
            URI uri = new URI(url);
            String query = uri.getQuery();
            if (query != null) {
                for (String param : query.split("&")) {
                    String[] keyValue = param.split("=");
                    if (keyValue.length == 2 && "token".equals(keyValue[0])) {
                        return keyValue[1];
                    }
                }
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }
}

