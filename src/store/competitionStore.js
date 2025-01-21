// Add these methods to the existing competitionStore.js

{
  // Add to state
  joinRequests: [],
  invitations: [],

  // Add these actions
  joinCompetition: async (competitionId, paymentDetails = null) => {
    set({ isLoading: true, error: null })
    
    try {
      const competition = get().getCompetition(competitionId)
      if (!competition) throw new Error('Competition not found')

      // Check if competition requires approval
      if (competition.requiresApproval) {
        // Add to join requests
        const request = {
          id: `req_${Date.now()}`,
          competitionId,
          userId: 'current_user', // Replace with actual user ID
          status: 'pending',
          timestamp: new Date().toISOString()
        }

        set(state => ({
          joinRequests: [...state.joinRequests, request],
          isLoading: false
        }))

        return request
      }

      // Process payment if required
      if (competition.entryFee > 0 && paymentDetails) {
        // TODO: Process payment
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Add user to competition
      set(state => ({
        competitions: state.competitions.map(comp =>
          comp.id === competitionId
            ? {
                ...comp,
                participants: [...comp.participants, 'current_user'] // Replace with actual user ID
              }
            : comp
        ),
        isLoading: false
      }))

      return true
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false
      })
      throw error
    }
  },

  sendInvitation: async (competitionId, userId) => {
    set({ isLoading: true, error: null })

    try {
      const invitation = {
        id: `inv_${Date.now()}`,
        competitionId,
        userId,
        status: 'pending',
        timestamp: new Date().toISOString()
      }

      set(state => ({
        invitations: [...state.invitations, invitation],
        isLoading: false
      }))

      return invitation
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false
      })
      throw error
    }
  },

  respondToInvitation: async (invitationId, accept) => {
    set({ isLoading: true, error: null })

    try {
      set(state => ({
        invitations: state.invitations.map(inv =>
          inv.id === invitationId
            ? { ...inv, status: accept ? 'accepted' : 'declined' }
            : inv
        ),
        isLoading: false
      }))

      if (accept) {
        const invitation = get().invitations.find(inv => inv.id === invitationId)
        if (invitation) {
          await get().joinCompetition(invitation.competitionId)
        }
      }

      return true
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false
      })
      throw error
    }
  },

  approveJoinRequest: async (requestId) => {
    set({ isLoading: true, error: null })

    try {
      const request = get().joinRequests.find(req => req.id === requestId)
      if (!request) throw new Error('Join request not found')

      await get().joinCompetition(request.competitionId)

      set(state => ({
        joinRequests: state.joinRequests.map(req =>
          req.id === requestId
            ? { ...req, status: 'approved' }
            : req
        ),
        isLoading: false
      }))

      return true
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false
      })
      throw error
    }
  }
}
