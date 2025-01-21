import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      reset()
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Contact Support
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Subject
          </label>
          <input
            {...register('subject', { required: 'Subject is required' })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Message
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            rows={6}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 rounded-lg font-medium text-white
            ${isSubmitting ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitSuccess && (
          <p className="text-green-500 text-center">
            Message sent successfully! We'll get back to you soon.
          </p>
        )}
      </form>
    </div>
  )
}
