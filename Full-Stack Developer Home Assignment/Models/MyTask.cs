using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Full_Stack_Developer_Home_Assignment.Models
{
    public class MyTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        [ForeignKey("User")]
        public string Email { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Title { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }


        public MyTask(int id, string email, string description ,string title, bool isCompleted, DateTime dueDate, DateTime createdAt)
        {
            Id = id;
            Email = email;
            Description = description;
            Title = title;
            IsCompleted = isCompleted;
            DueDate = dueDate;
            CreatedAt = createdAt;
        }
    }
}
