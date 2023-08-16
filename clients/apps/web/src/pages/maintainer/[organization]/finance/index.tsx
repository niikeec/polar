import Gatekeeper from '@/components/Dashboard/Gatekeeper/Gatekeeper'
import Finance from '@/components/Finance/Finance'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import { useToast } from '@/components/UI/Toast/use-toast'
import type { NextLayoutComponentType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  useListPledgesForOrganization,
  useOrganizationAccounts,
} from 'polarkit/hooks'
import { ReactElement, useEffect } from 'react'
import { useCurrentOrgAndRepoFromURL } from '../../../../hooks'

const Page: NextLayoutComponentType = () => {
  const router = useRouter()
  const { status } = router.query
  const { toast } = useToast()

  const { org, isLoaded } = useCurrentOrgAndRepoFromURL()

  useEffect(() => {
    if (isLoaded && !org) {
      router.push('/maintainer')
      return
    }
  }, [isLoaded, org, router])

  useEffect(() => {
    if (status === 'stripe-connected') {
      toast({
        title: 'Stripe setup complete',
        description: 'Your account is now ready to accept pledges.',
      })
    }
  }, [status, toast])

  const pledges = useListPledgesForOrganization(org?.platform, org?.name)

  const accounts = useOrganizationAccounts(org?.name)

  return (
    <>
      <Head>
        <title>Polar{org ? ` ${org.name}` : ''}</title>
      </Head>
      {org && pledges.data && accounts.data && (
        <Finance
          pledges={pledges.data}
          org={org}
          tab="current"
          accounts={accounts.data}
        />
      )}
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return (
    <Gatekeeper>
      <DashboardLayout showSidebar={true}>{page}</DashboardLayout>
    </Gatekeeper>
  )
}

export default Page
