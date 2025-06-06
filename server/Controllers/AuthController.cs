using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {

        // Identity provided managers for sign-in / crud actions
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
                return Unauthorized(new { message = "Invalid username" });

            var result = await _signInManager.PasswordSignInAsync(
                user,
                request.Password,
                isPersistent: true, // multiple session auth
                lockoutOnFailure: false);

            if (!result.Succeeded)
                return Unauthorized(new { message = "Invalid password" });

            return Ok(new { message = "Logged in!" });
        }

        

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logged out!" });
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            if (!User.Identity?.IsAuthenticated ?? false)
                return Ok(new { isAuthenticated = false });

            var user = await _userManager.GetUserAsync(User);

            return Ok(new
            {
                isAuthenticated = true,
                username = user?.UserName
            });
        }
}

public record LoginRequest(string Username, string Password);
public record RegisterRequest(string Username, string Password);