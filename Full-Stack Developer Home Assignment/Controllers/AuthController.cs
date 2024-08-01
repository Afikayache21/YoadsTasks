using Full_Stack_Developer_Home_Assignment.Models;
using Full_Stack_Developer_Home_Assignment.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Full_Stack_Developer_Home_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthProvider _authProvider;
        private readonly UserProvider _userProvider;

        public AuthController(AuthProvider authProvider, UserProvider userProvider)
        {
            _authProvider = authProvider;
            _userProvider = userProvider;
        }


        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] User loginRequest)
        {
            try
            {
                var user = await _userProvider.ValidateUser(loginRequest);


                if (user.Value == null)
                    return Unauthorized();

                var token = "dummy-token";

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Register([FromBody] User loginRequest)
        {
            try
            {
                var res = await _authProvider.Register(loginRequest);
                return res;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
