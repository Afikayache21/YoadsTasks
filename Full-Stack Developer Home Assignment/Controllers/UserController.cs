using Full_Stack_Developer_Home_Assignment.Models;
using Full_Stack_Developer_Home_Assignment.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Full_Stack_Developer_Home_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthProvider _authProvider;
        private readonly UserProvider _userProvider;

        public UserController(AuthProvider authProvider, UserProvider userProvider)
        {
            _authProvider = authProvider;
            _userProvider = userProvider;

        }

        [HttpDelete("{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string email)
        {
            try
            {
                var result = await _userProvider.DeleteUserByEmail(email);
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _userProvider.GetAllUsers();
            return Ok(users);
        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] User toUpdate)
        {
            if (toUpdate == null)
            {
                return BadRequest("User update information cannot be null");
            }

            try
            {
                var result = await _userProvider.UpdateUserByEmail(toUpdate);
                if (!result)
                {
                    return NotFound("User not found");
                }

                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

    }


}

