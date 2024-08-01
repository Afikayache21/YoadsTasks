using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Developer_Home_Assignment.Models
{
    public class User
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public List<MyTask> Tasks { get; set; } = new List<MyTask>();

        public User(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
