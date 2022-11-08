import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase-client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // `increment_views` is the name we assigned to the function in Supabase, and page_slug is the argument we defined.
    await supabase.rpc('increment_views', { page_slug: req.body.slug })
    return res.status(200).send('Success')
  } else {
    return res.status(400).send('Invalid request method')
  }
}

export default handler
